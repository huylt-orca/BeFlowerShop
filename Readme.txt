lần đầu chạy sau khi clone
cmd: npm install

tạo sẵn db mysql tên trong cấu hình
cmd: cd src
cmd: npx sequelize-cli db:migrate
chạy lệnh để tạo table trong db

thêm dữ liệu vào db
cmd:  npx sequelize-cli db:seed:all


chạy server
cmd: npm start