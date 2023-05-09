#!/bin/bash
mongosh --quiet <<EOF
use shareJob
db.dropDatabase()
use shareJob
db.companyInfo.insertOne( {
   email: "test@test.co.jp",
   id: 1,
   memo: "test",

} );

db.company.insertOne( {
   id: 1,
   name:"マクロコスモス",
   abstract:"エネルギー企業",
   industries:["エネルギー産業"],
   locations:["ガラル地方"],

} );

db.user.insertOne( {
   email: "test@test.co.jp",
   name: "てすとたろう",
   password: "password",
   companyInfoList: [1],

} );
exit
EOF
