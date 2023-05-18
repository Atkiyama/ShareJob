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


db.companyInfo.insertOne( {
   email: "test@test.co.jp",
   id: 2,
   memo: "てすと",

} );

db.company.insertOne( {
   id: 1,
   name:"マクロコスモス",
   abstract:"エネルギー企業",
   industries:["エネルギー産業"],
   locations:["ガラル地方"],

} );

db.company.insertOne( {
   id: 2,
   name:"モンスターズインク",
   abstract:"恐怖エネルギー企業",
   industries:["恐怖エネルギー産業"],
   locations:["モンスターワールド"],

} );

db.users.insertOne( {
   email: "test@test.co.jp",
   name: "てすとたろう",
   password: "password",
   companyInfoList: [1,2],

} );
exit
EOF
