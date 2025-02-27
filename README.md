<p align="center">
  <a href="" rel="noopener">
 <img width=204px height=201px src="https://i.pinimg.com/originals/22/e6/cc/22e6cc48795a2c55e7b8eed39d0c5034.gif" alt="Project logo"></a>
</p>

<h3 align="center">Tradon Fullstack Workshop</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()

</div>

---

<p align="center"> Poster board web application.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [All Feature](#getting_started)
- [Backend Feature](#be-feature)
- [Structure](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)

## 🧐 About <a name = "about"></a>

เว็บสำหรับสร้างกระทู้ และแสดงความคิดเห็น มีระบบสมาชิกอย่างง่ายทำด้วย JWT
Frontend framework ใช้ NextJs Backend framwork ใช้ NestJs

## 🏁 All Feature <a name = "getting_started"></a>

- ระบบกระทู้
  - แสดงผลกระทู้ทั้งหมด
  - สามารถสร้างกระทู้ได้แต่ต้อง login ก่อนเท่านั้น
  - สามารถกดที่กระทู้เพื่อเข้าไปดูรายละเอียดด้านใน
  - สามารถลบกระทู้ได้
  - สามารถแก้ไขกระทู้ได้
  - ระบบดูกระทู้ทั้งหมดที่ user สร้างไว้
  - ระบบแสดงความคิดเห็น
- ระบบค้นหา
  - <span style="color:#eb9430">ค้นหาตามหมวดหมู่ community (ยังไม่เสร็จ)</span>
  - <span style="color:#eb9430">ค้นหาตามหมวดหมู่ community + keyword (ยังไม่เสร็จ)</span>
- ระบบสมาชิก
  - login ได้ด้วย username ที่ต้อง generate ให้
  - logout สามารถ logout ได้
  - มีการเก็บ cookie ต้องเปิด cookie consent ของ browser ก่อนใช้งาน หรือเข้า icognito mode
- รองรับ responsive design ที่ 768px

## 🏁 Backend Feature <a name = "be-feature"></a>

- Security
  - X-api-key ตรวจสอบ apiKey ทุก endpoint (ถ้าใช้จะแทนด้วย X)
  - Cookie ใช้สร้าง acces token สำหรับตรวจสอบสิทธิ์
  - Authorizetion ใช้ตรวจสอบเฉพาะ endpoint ที่ต้องใช้ access token (ถ้าใช้จะแทนด้วย A)
- End Point
  - Auth (X)
    - Login ตรวจสอบ user เพื่อสร้าง access token + cookie writer (A)
    - Logout access token clear
  - User (X)
    - Save สร้าง user (A)
    - FindUser ดึงข้อมูล user (A)
  - Comment
    - Save สร้าง comment ด้วย placardId และ userId (A)
    - Update แก้ไขข้อมูล comment ด้วย commentId (A)
    - FindCommentList ค้นหาข้อมูล comment ทั้งหมดด้วย placardId
    - Delete ลบ comment (A)
  - Placard
    - Save สร้าง placard ด้วย userId และ commentId (A)
    - Update แก้ไขข้อมูล placard ด้วย placardId (A)
    - FindPlacardList ค้นหาข้อมูล placard ทั้งหมดด้วย userId (A)
    - FindPlacardList ค้นหาข้อมูล placard ทั้งหมด
    - Delete ลบ placard (A)

## 🥊 Structure

- FrontEnd / Hexagonal architecture
- BackEnd / Modular architecture

## 🔧 Deployment <a name = "deployment"></a>

- Frontend
  - Domain https://tr-workshop-fe-02.vercel.app
  - Repository https://github.com/ballinwza/tr-workshop-fe-02
- Backend
  - Domain https://tr-workshop-be-01.onrender.com
  - Repository https://github.com/ballinwza/tr-workshop-be-01
-

## 🎈 Usage <a name="usage"></a>

- สามารถเข้าไปทดสอบที่ [https://tr-workshop-fe-02.vercel.app](https://tr-workshop-fe-02.vercel.app) ได้เลย ใช้ swagger ในการทำ API document ส่วน username ที่ใช้จะแนบไปให้ใน email

  - บางครั้ง server down เพราะ deploy บน free service อาจจะต้องไปลอง run ด้วย docker หรือ local

- การใช้งานผ่าน docker

  - clone project
  - ขอ ENV เพื่อจำลองการใช้งาน
  - ติดตั้ง Docker
  - ถ้ามี makefile ในเครื่อง
    - พิมคำสั่ง make build-docker-image
    - พิมคำสั่ง make run-docker
  - ถ้าไม่มี Makefile ในเครื่อง
    - พิมคำสั่ง docker build -t tr-workshop-be-01 .
    - พิมคำสั่ง docker run -p 8001:8000 -d tr-workshop-be-01
    - เข้าในงานที่ [http://localhost:8001](http://localhost:8001)
  - เปิดการใช้งาน cookie ใน browser
  - พิม username ที่ส่งไปให้ เพื่อเข้าใชงานเต็มระบบ

- การใช้งานผ่าน localhost
  - clone project
  - ขอ ENV เพื่อจำลองการใช้งาน
  - pnpm install
  - pnpm start:dev
  - เข้าในงานที่ [http://localhost:8000](http://localhost:8000)
  - เปิดการใช้งาน cookie ใน browser
  - พิม username ที่ส่งไปให้ เพื่อเข้าใชงานเต็มระบบ

## ⛏️ Build Using <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Database
- [Mongoose](https://mongoosejs.com/) - ODM Library
- [NestJs](https://docs.nestjs.com/) - Server Framework
- [NextJs](https://nextjs.org/) - Web Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Swagger](https://swagger.io/) - Generator Api document
- [AntD](https://ant.design/) - UI library
- [EmotionCss](https://emotion.sh/docs/install) - Styler CSS-in-Js for runtime css like animaiton
- [HeadlessUI](https://headlessui.com/) - UI library for complex customize component
- [TailwindCss](https://tailwindcss.com/) - Css styler in class

- Utils Library
  - prettier / จัดการ code ให้เป็นระเบียบ
  - husky / ใช้ run CI command ก่อน push เข้า Git
  - bcryptjs / สำหรับ encode และตรวจสอบการเข้ารหัส
  - class-validator / ตรวจสอบ type
  - cookie-parser / ตัวแปลง cookie จาก http ให้อยู่ในรูป object
  - zustand / state managment
