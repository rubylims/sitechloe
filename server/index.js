const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

// MySQL 연결 설정 (환경에 맞게 수정)
const db = mysql.createConnection({
  host: 'sc-mysqlfs.mysql.database.azure.com',
  user: 'mysqladmin', // 사용자에 맞게 변경
  password: 'Site2025!@#', // 비밀번호에 맞게 변경
  database: 'scmysqlfsdb_kdwqidto', // DB명에 맞게 변경
});

db.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패:', err);
  } else {
    console.log('MySQL 연결 성공!');
  }
});

// 회원가입 API
app.post('/api/register', (req, res) => {
  const { loginid, name, email, phone, password } = req.body;
  if (!loginid || !name || !email || !password) {
    return res.status(400).json({ message: '필수 항목 누락' });
  }
  // loginid, email 중복 체크
  db.query('SELECT * FROM users WHERE loginid = ? OR email = ?', [loginid, email], (err, results) => {
    if (err) return res.status(500).json({ message: 'DB 오류' });
    if (results.length > 0) {
      return res.status(409).json({ message: '이미 존재하는 로그인ID 또는 이메일' });
    }
    // 회원 정보 저장
    db.query(
      'INSERT INTO users (loginid, name, email, phone, password) VALUES (?, ?, ?, ?, ?)',
      [loginid, name, email, phone, password],
      (err, result) => {
        if (err) return res.status(500).json({ message: 'DB 오류' });
        return res.json({
          message: '회원가입 성공',
          user: {
            loginid,
            name,
            email,
            phone
          }
        });
      }
    );
  });
});

// 비밀번호 찾기 API (임시 비밀번호 발급)
app.post('/api/forgot-password', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: '이메일 필요' });
  const tempPassword = Math.random().toString(36).slice(-8);
  db.query('UPDATE users SET password = ? WHERE email = ?', [tempPassword, email], (err, result) => {
    if (err) return res.status(500).json({ message: 'DB 오류' });
    if (result.affectedRows === 0) return res.status(404).json({ message: '존재하지 않는 이메일' });
    return res.json({ message: '임시 비밀번호 발급', tempPassword });
  });
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중`);
}); 