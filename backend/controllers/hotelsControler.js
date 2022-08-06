const hotelAddModel = require("../models/adminPanelHotelAddModel")
const { cloudinary } = require("./utils/cloudinary");


hotelAdd = async (req, res) => {
    console.log(req.body.email)
    const checkHotels = await hotelAddModel.find({})
    console.log(checkHotels)
    let flag = false;
    for (var i = 0; i < checkHotels.length; i++) {
        if (checkHotels[i].Email === req.body.email) {
            flag = true

            return res.send({ message: "You have already entered your hotel details", success: false, data: checkHotels })
        }
    }
    try {

        if (req.body.Price && req.body.Name && req.body.Services_of_Rooms && req.body.Room_Details && req.body.Services && req.body.img) {
            const fileStr = await req.body.img;
            const uploadResponse = await cloudinary.uploader.upload(fileStr, {
                folder: 'hotelImages'
            });
            console.log(uploadResponse)
            res.statusCode = 201;
            let price = parseInt(req.body.Price)

            if (!checkHotels) {
                checkHotels = [{
                    Name: req.body.Name,
                    Price: price,
                    Services_of_Rooms: req.body.Services_of_Rooms,
                    Image: uploadResponse.url,
                    Room_Details: req.body.Room_Details,
                    Services: req.body.Services,
                    Email: req.body.email,
                    Img_Cloud_Id: uploadResponse.public_id
                }]
            } else if (checkHotels) {
                checkHotels.push({
                    Name: req.body.Name,
                    Price: price,
                    Services_of_Rooms: req.body.Services_of_Rooms,
                    Image: uploadResponse.url,
                    Room_Details: req.body.Room_Details,
                    Services: req.body.Services,
                    Email: req.body.email,
                    Img_Cloud_Id: uploadResponse.public_id
                })
            }

            let hotelAdd = await new hotelAddModel({
                Name: req.body.Name,
                Price: price,
                Services_of_Rooms: req.body.Services_of_Rooms,
                Image: uploadResponse.url,
                Room_Details: req.body.Room_Details,
                Services: req.body.Services,
                Email: req.body.email,
                Img_Cloud_Id: uploadResponse.public_id
            })
            await hotelAdd.save()
            return res.send({ message: "hotel created Successfully", success: true, data: checkHotels })
            console.log(hotelAdd)
        } else {
            res.statusCode = 400;
            return res.send("Post Field is missing ");
        }
    } catch (e) {
        return res.send({ success: false, message: e.message })

    }


}

getHotels = async (req, res) => {
    try {
        res.statusCode = 200;
        const checkHotels = await hotelAddModel.find({})
        return res.send({ data: checkHotels, success: true, message: "Successfully Hotels Fetched " })
    }

    catch (err) {
        return res.send({ success: false, message: err.message })
    }
}
delHotel = async (req, res) => {
    try {
        res.statusCode = 200;
        await hotelAddModel.deleteOne({ Email: req.body.Email })
        const hotelsAfterDelete = await hotelAddModel.find({})
        await cloudinary.uploader.destroy(req.body.Img_Cloud_Id, {
            resource_type: 'image'
        });

        return res.send({ data: hotelsAfterDelete, success: true, message: "Successfully Hotel Delete " })
    }

    catch (err) {
        return res.send({ success: false, message: err.message })
    }
}
updHotel = async (req, res) => {
    console.log(req.body.updHotelDetails.image , req.body.updHotelDetails.img_Cloud_Id)
    try {
        res.statusCode = 200;
        let updHotelDetails = {...req.body.updHotelDetails ,  Email : req.body.Email , Image :req.body.updHotelDetails.image , Img_Cloud_Id: req.body.updHotelDetails.img_Cloud_Id }
        if (req.body.img) {
            await cloudinary.uploader.destroy(req.body.updHotelDetails.img_Cloud_Id, {
                resource_type: 'image'
            });
            const fileStr = await req.body.img;
            const uploadResponse = await cloudinary.uploader.upload(fileStr, {
                folder: 'hotelImages'
            });
            console.log(uploadResponse)
            updHotelDetails = {...req.body.updHotelDetails , Image : uploadResponse.url ,  Img_Cloud_Id: uploadResponse.public_id , Email : req.body.Email}
        }

        await hotelAddModel.replaceOne({ Email: req.body.Email }, updHotelDetails)
        const hotelsAfterUpd = await hotelAddModel.find({})
        


        return res.send({ data: hotelsAfterUpd, success: true, message: "Successfully Hotel Update " })

    }
    catch (err) {
        return res.send({ success: false, message: err.message })
    }

}
module.exports = { hotelAdd, getHotels, delHotel, updHotel }