lần đầu chạy sau khi clone
cmd: npm install

tạo sẵn db mysql tên(prm392)  trong cấu hình, ko cần table
cmd: cd src
cmd: npx sequelize-cli db:migrate
chạy lệnh để tạo table trong db

thêm dữ liệu vào db
cmd:  npx sequelize-cli db:seed:all


chạy server
cmd: npm start

api:
- jwt
- thanh toan payment
- bỏ ảnh lên firebase
- deploy db
- deploy be


- create
- index
- update
- getAll(pagination)
- delete(change)

- search (User, Invoice,Product, Category)


xong:
- Cart (create-update, delete, getAllByUserId)
- Category (create, update, getAll)
- Favorite (create, delete, getAllByUserId)
- Image()
- Invoice(create,getAllByUserId, getIndex)
- Product(create,getAll-pagination, getIndex, update, getName)
- User(login, signup, getAll, getIndex,getName )
