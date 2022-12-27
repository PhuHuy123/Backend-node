require('dotenv').config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async(dataSend)=>{

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
        user: process.env.EMAIL_APP, // generated ethereal user
        pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Khóa Luận Tốt nghiệp 👻" <zombiipark@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khắm bệnh ✔", // Subject line
        // text: "Hello world?", 
        html: getBodyHTMLEmail(dataSend), // html body
    });
}
let getBodyHTMLEmail = (dataSend) =>{
    let res = ''
    if(dataSend.language === 'vi'){ 
        res =`
                <h3>Xin chào ${dataSend.patientName}</h3>
                <p>Bạn nhận được email này vì đã đặt lịch khắm bệnh trên hệ thống book khám bệnh</p>
                <p>Thông tin đặt lịch khám bệnh:</p>
                <div><b>Thời gian: ${dataSend.time}</b></div>
                <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>         
                <p>Nếu các thông tin trên là đúng sự thật,vui lòng click vào đường link bên dưới
                    để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.
                </p>
                <div>
                    <a href=${dataSend.redirectLink} target="_blank" > Bấm vào đây </a>
                </div>
                <div>Xin chân thành cảm ơn</div>
            `
    }
    if(dataSend.language === 'en'){ 
        res =`
                <h3>Hello ${dataSend.patientName}</h3>
                <p>You received this email because you booked an appointment on the medical booking system</p>
                <p>Information to schedule an appointment:</p>
                <div><b>Time: ${dataSend.time}</b></div>
                <div><b>Doctor: ${dataSend.doctorName}</b></div>         
                <p>
                    If the above information is true, please click on the link below to confirm and complete the procedure to book an appointment.
                </p>
                <div>
                    <a href=${dataSend.redirectLink} target="_blank" > Click here </a>
                </div>
                <div>Thanks you!</div>
            `
    }
    return res
}
let sendAppointment = async(dataSend)=>{

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
        user: process.env.EMAIL_APP, // generated ethereal user
        pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Khóa Luận Tốt nghiệp 👻" <zombiipark@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Kết quả đặt lịch khắm bệnh ✔", // Subject line
        // text: "Hello world?", 
        html: getBodyHTMLEmailRemery(dataSend), // html body
        attachments: [
            {
                filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
                content: dataSend.imgBase64.split("base64,")[1],
                encoding: 'base64',
            },
        ]
    });
}
let getBodyHTMLEmailRemery = (dataSend) =>{
    let res = ''
    if(dataSend.language === 'vi'){ 
        res =`
                <h3>Xin chào ${dataSend.patientName}!</h3>
                <p>Bạn nhận được email này vì đã đặt lịch khắm bệnh trên hệ thống book khám bệnh</p>
                <p>Thông tin đơn thuốc và hóa đơn sẽ được gửi trong file đính kèm.</p>
                <div>Xin chân thành cảm ơn</div>
            `
    }
    if(dataSend.language === 'en'){ 
        res =`
                <h3>Hello ${dataSend.patientName}!</h3>
                <p>You received this email because you booked an appointment on the medical booking system</p>
                <p>Prescription and invoice information will be sent in the attachment.</p>
                <div>Thanks you!</div>
            `
    }
    return res
}
let updatePasswordEmail = async(dataSend)=>{

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
        user: process.env.EMAIL_APP, // generated ethereal user
        pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Book my doctor 👻" <zombiipark@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Reset Password ✔", // Subject line
        // text: "Hello world?", 
        html: getBodyHTMLEmailUpdatePassword(dataSend), // html body
    });
}
let getBodyHTMLEmailUpdatePassword = (dataSend) =>{
    let res =`
                <h3>Xin chào bạn</h3>
                <p>Bạn nhận được email này vì bạn gặp vấn đề về password</p>
                <p>Click vào link bên dưới để tiến hành đổi password</p>
                <div>
                    <a href=${dataSend.redirectLink} target="_blank" > --> Bấm vào đây <-- </a>
                </div>
                <div>Xin chân thành cảm ơn</div>
            `
    return res
}
export {
    sendSimpleEmail as  sendSimpleEmail,
    sendAppointment as sendAppointment,
    updatePasswordEmail as updatePasswordEmail,
}
