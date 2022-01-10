# RestaurantList

* 輸入網址已轉換為短網址
* 判斷網址是否存在
* 判斷網址是否可連結
* 可以註冊帳號
* 登入後可以儲存短網址

# 環境建置與需求
* Node.js v14.17.4
* Nodemon v2.0.15
* bcryptjs v2.4.3
* connect-flash v0.1.1
* express v4.17.1
* express-handlebars v6.0.2
* express-session v1.17.2
* is-url v1.2.4
* method-override v3.0.0
* mongoose v6.1.2
* passport v0.5.2
# 安裝與執行步驟

  * 資料庫相關 
  
  安裝mongoDB  
  安裝Robo 3T  
  開啟mongoDB伺服器  
  連線到mongoDB伺服器  
  創建名為 short-url 的資料庫 

開啟終端機(Terminal)cd 到存放專案本機位置並執行:  

    $ git clone https://github.com/yongde2900/short-url.git   
至專案資料夾使用npm安裝套件

    $ cd restaurantList
    $ npm install


使用nodemos開啟app.js

    $ npm run dev
成功開啟會出現以下訊息

    server is listening
    
進入http://localhost:3000 即可使用本專案
