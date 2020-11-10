const express = require('express');
const mysql = require('mysql');
const hbs =  require('hbs');
const bodyParser = require('body-parser');

const app = express();
const port = 7000;

app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


var koneksi =  mysql.createConnection({
   host: 'localhost',
   user: 'Azizi',
   password: '1945',
   database: 'DB_PENDUDUK'
});

koneksi.connect((err) => {
   if(err) throw err;
   console.log("Koneksi Database Berhasil Terkoneksi");
});

app.get('/', (req, res) => {
   koneksi.query('SELECT * FROM DATA_PENDUDUK', (err, hasil) => {
    if(err) throw err;
    res.render('home.hbs', {
        judulhalaman: 'DATA PENDUDUK',
        data: hasil
      });
   });
});

app.post('/tambah', (req, res) => {
  var NAMA = req.body.inputnama;
  var ALAMAT = req.body.inputalamat;
  var TEMPATTANGGALLAHIR = req.body.inputtempattanggallahir;  
  var GOLONGANDARAH = req.body.inputgolongandarah;
  var TELEPON = req.body.inputtelepon;
  koneksi.query('INSERT INTO DATA_PENDUDUK( NAMA, ALAMAT, TEMPAT_TANGGAL_LAHIR, GOLONGAN_DARAH, TELEPON) VALUES( ?, ?, ?, ?, ?)',
        [  NAMA, ALAMAT, TEMPATTANGGALLAHIR, GOLONGANDARAH,TELEPON ],
            (err, hasil) => {
                if(err) throw err;
                res.redirect('/');
                }
          )
});
app.listen(port, () => {
    console.log(`App berjalan pada port ${port}`);
})