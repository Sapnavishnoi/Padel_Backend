const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


// Load User model
const User = require('../models/Users');
const Pacakage = require('../models/Pacakage');
const Kid = require('../models/Kids');
const Slot = require('../models/Slot');
const SlotBooking = require('../models/Booking');
const Home = require('../models/Home');
const Location = require('../models/Location');
const Booking = require('../models/Booking');
const Coach = require('../models/Coach');
const Terms = require('../models/Terms');
const Support = require('../models/Support');
const Notification = require('../models/Notification');

const app = express();



const addKid = async function (req, res) {

    const userInfo = await User.findById({_id: req.user});

    if (userInfo.validate === false) {
        return res.send({ message: "Email doesn't exists. Please register.", code: 201 })
    }
    var user = req.user;
    console.log(user, "user id!!!")
    const newKid = new Kid({ user_id: user, name: req.body.name, dateOfBirth: req.body.dateOfBirth });
    newKid.save()
        .then(newKid => res.json({ message: "Kids detail added successfully", code: 200 }))
        .catch(err =>  res.send({ message: "Internal error", code: 201 }))
};


const createPacakage = async function(req, res) {
    const userInfo = await User.findById({_id: req.user});

    if (userInfo.validate === false) {
        return res.send({ message: "Email doesn't exists. Please register.", code: 201 })
    }
    const newPacakage = new Pacakage({
        month: req.body.month,
        plan_name: req.body.plan_name,
        days: req.body.days
    });
    newPacakage.save()
        .then(res.json({ message: "New package added successfully", code: 200 }))
        .catch(err =>  res.send({ message: "Internal error", code: 201 }))
};

const getPacakage = async function (req, res) {
    const userInfo = await User.findById({_id: req.user});

    if (userInfo.validate === false) {
        return res.send({ message: "Email doesn't exists. Please register.", code: 201 })
    }

    try {

        var details = await Pacakage.find();
        console.log(details, "details....")

        const groupedPlans = details.reduce((acc, val) => {
            console.log(val, "acc...val..")
            const valMonth = val.month;
            const planGroup = acc.find(plan => plan.month === valMonth);

            if (!planGroup) {
                acc.push({ month: valMonth, plans: [val] })
            } else {
                planGroup.plans = [...planGroup.plans, val];
            }

            return acc;
        }, [])
        res.json({
            groupedPlans
        });
    } catch (err) {
        return  res.send({ message: "Internal error", code: 201 });
    }
}

const getKidsDetail = async function (req, res) {

    const userInfo = await User.findById({_id: req.user});

    if (userInfo.validate === false) {
        return res.send({ message: "Email doesn't exists. Please register.", code: 201 })
    }

    try {
        var details = await Kid.find({ user_id: req.user });
        console.log(details)
        res.json({
            details
        });
    } catch (err) {
        return  res.send({ message: "Internal error", code: 201 });
    }
}

//update kid details

const updateKidDetails = async function (req, res) {

    const userInfo = await User.findById({_id: req.user});

    if (userInfo.validate === false) {
        return res.send({ message: "Email doesn't exists. Please register.", code: 201 })
    }
    try {

        const detail = await Kid.updateMany({ _id: req.body.kidId }, {
            $set: {
                name: req.body.name,
                dateOfBirth: req.body.dateOfBirth
            }
        })
        res.json({message: "Kid details updated successfully", code: 200 })

    } catch (err) {
        res.json({ message: "Kid details not updated", code: 201 });
    }

}

//create slot

const createSlot = async function (req, res) {

    const userInfo = await User.findById({_id: req.user});

    if (userInfo.validate === false) {
        return res.send({ message: "Email doesn't exists. Please register.", code: 201 })
    }
    const newSlot = new Slot({
        planId: req.body.planId,
        slotName: req.body.slotName,
        timing: req.body.timing,
        totalSlot: req.body.totalSlot,
        month: req.body.month,
        leftslots: req.body.totalSlot,
        amount: req.body.amount
    });
    newSlot.save()
        .then(newSlot => res.json({ newSlot, message: "New slot added successfully", code: 200 }))
        .catch(err =>  res.send({ message: "Internal error", code: 201 }))
};

//get slot

const getSlotDetail = async function (req, res) {

    const userInfo = await User.findById({_id: req.user});

    if (userInfo.validate === false) {
        return res.send({ message: "Email doesn't exists. Please register.", code: 201 })
    }

    var detail = [];

    try {
        // var details =  await Kid.find({user_id:req.user});
        var count = 0;
        var values = await Slot.find();

        values.filter((val) => {
            var seatsleft = val.totalSlot - count;
            detail.push({ "data": val, "leftslots": seatsleft });

            return detail;
        })
        res.json({
            detail
        });
    } catch (err) {
        return  res.send({ message: "Internal error", code: 201 });
    }
}

//get slot by plan Id/ pacakage Id

const getSlotByPlanId = async function (req, res) {

    const userInfo = await User.findById({_id: req.user});

    if (userInfo.validate === false) {
        return res.send({ message: "Email doesn't exists. Please register.", code: 201 })
    }

    var query = req.params.id;

    try {
        // var details =  await Kid.find({user_id:req.user});
        var detail = await Slot.find({ planId: query });
        console.log(detail, "------------")
        res.json({ detail, message: "Slot by plan Id", code: 200 });
    } catch (err) {
        return  res.send({ message: "Internal error", code: 201 });
    }
}

//slot booking
const bookSlot = async function (req, res) {

    const userInfo = await User.findById({_id: req.user});

    if (userInfo.validate === false) {
        return res.send({ message: "Email doesn't exists. Please register.", code: 201 })
    }

    try {
        var details = req.body.slot;
        var transactionId = "ljdksfjlkmgkeg";
        details.filter(async (value) => {
            console.log(value, ".........");
            var slot = await Slot.findById(value.slotsId);
            var plan = await Pacakage.findById(slot.planId);
            console.log(plan, "plannnn.....")
            var amount = slot.amount * value.kidsId.length;
            console.log(amount, "amount")
            console.log(slot, "slot......")

            if (slot.leftslots >= value.kidsId.length) {
                const newSlot = new SlotBooking({
                    transactionId: transactionId,
                    planName: value.planName,
                    month: value.month,
                    slotsId: value.slotsId,
                    slotName: value.slotName,
                    timing: value.timing,
                    amount: amount,
                    kidsId: value.kidsId,
                    status: value.status,
                    userId: req.user
                });

                newSlot.save().then(() => {
                    return res.json({ newSlot, message: "Slot Booked successfully", code: 200 })
                })
                var seats = await slot.totalSlot - value.kidsId.length;

                try {

                    const x = await Slot.updateOne({ _id: value.slotsId }, {
                        $set: {
                            leftslots: seats
                        }
                    })

                } catch (err) {
                   return res.send({ message: "Internal error", code: 201 });
                }


                //  (value.slot_id,{leftslots:seats})



            } else {
                res.json({ message: `${slot.leftslots} seats available in ${value.slotName} ,`, code: 201 })
            }
        })

        //todo: payment logic

        // res.json({"link":"",message: "Slot Booked successfully", code: 200 })
        res.json({ message: "Slot Booked successfully", code: 200 })
    }
    catch (err) {
        return { message: "Please try to book again!!", code: 201 };
    }


}

//get package details/booking details

const getPlanDetails = async function (req, res) {

    const userInfo = await User.findById({_id: req.user});

    if (userInfo.validate === false) {
        return res.send({ message: "Email doesn't exists. Please register.", code: 201 })
    }

    try {
        var detail =  await Booking.find({userId:req.user});
        console.log(detail)
        res.json({ detail, message: "Plan/booking details fetched successfully", code: 200 });
    } catch (err) {
        return res.send({ message: "Internal error", code: 201 });
    }
}


//create home page tag lines
const homeTagLine = async function (req, res) {

    
    console.log(req.body, "req.body")
    const newHome = new Home({
        title: req.body.title,
        tagLine: req.body.tagLine

    });
    newHome.save()
        .then(newHome => res.json({ newHome, message: "Home tagline created successfully", code: 200 }))
        .catch(err => res.send({ message: "Internal error", code: 201 }))
}

//create terms and 

const createTerms = async function (req, res) {
    const userInfo = await User.findById({_id: req.user});

    if (userInfo.validate === false) {
        return res.send({ message: "Email doesn't exists. Please register.", code: 201 })
    }
    console.log(req.body, "req.body")
    const newTerms = new Terms({
        content: req.body.content

    });
    newTerms.save()
        .then(newTerms => res.json({ newTerms, message: "Terms and condition created successfully", code: 200 }))
        .catch(err =>  res.send({ message: "Internal error", code: 201 }))
}

//Add coach details

const addCoach = async function (req, res) {

    const userInfo = await User.findById({_id: req.user});

    if (userInfo.validate === false) {
        return res.send({ message: "Email doesn't exists. Please register.", code: 201 })
    }
    console.log(req.body, "req.body")
    const newCoach = new Coach({
        profile: req.body.profile,
        name: req.body.name,
        bio: req.body.bio,
        rating: req.body.rating

    });
    newCoach.save()
        .then(newCoach => res.json({ newCoach, message: "New Coach added successfully", code: 200 }))
        .catch(err =>  res.send({ message: "Internal error", code: 201 }))
}


//support api

const contactUs = async function (req, res) {

    console.log(req.body, "req.body")
    const newQuery= new Support({
       query: req.body.query,
        email: req.body.email
       

    });
    newQuery.save()
        .then(newQuery => res.json({ newQuery, message: "New support query added successfully", code: 200 }))
        .catch(err =>  res.send({ message: "Internal error", code: 201 }))
}

//notify user

const notifyUser = async function (req, res) {
    console.log(req.body, "req.body")
    const newNotification = new Notification ({
        userId: req.body.userId,
        title:req.body.title,
        msg: req.body.msg,
       createdBy: req.user
   
    });
    //todo ----- send notification to the user by firebase
    newNotification.save()
        .then(newNotification => res.json({ newNotification, message: "Notification sent to user successfully", code: 200 }))
        .catch(err =>  res.send({ message: "Internal error", code: 201 }))
}
//notifications
const getnotification = async function (req, res) {
    // const userInfo = await User.findById({_id: req.user});

    // if (userInfo.validate === false) {
    //     return res.send({ message: "Email doesn't exists. Please register.", code: 201 })
    // }

    try {
        // var details =  await Kid.find({user_id:req.user});
        console.log(req.user,"627f866bc7825aaa311c8542")
        var detail = await Notification.find({ userId: req.user});
        res.json({ detail, message: "All notification fetched successfully", code: 200 });
    } catch (err) {
        return  res.send({ message: "Internal error", code: 201 });
    }
}

const readAllNotifications = async function(req, res){
    const userInfo = await User.findById({_id: req.user});

    if (userInfo.validate === false) {
        return res.send({ message: "Email doesn't exists. Please register.", code: 201 })
    }
    try{

        await Notification.updateMany({user_id: req.user }, {
            $set: { isRead: true }
          })
        res.json({message: "Read all notifications successfully", code: 200 });

    }catch(err){
        return  res.send({ message: "Internal error", code: 201 });
    }
}

const clearAllNotification = async function(req, res){
    const userInfo = await User.findById({_id: req.user});

    if (userInfo.validate === false) {
        return res.send({ message: "Email doesn't exists. Please register.", code: 201 })
    }
    try{
        await Notification.deleteMany({user_id: req.user})
        res.json({message: "All notifications clear successfully", code: 200 });

    }catch(err){
        return  res.send({ message: "Internal error", code: 201 });
    }
}

const clearByNotificationId = async function(req, res){
    const userInfo = await User.findById({_id: req.user});

    if (userInfo.validate === false) {
        return res.send({ message: "Email doesn't exists. Please register.", code: 201 })
    }
    try{
        
        await Notification.deleteOne({_id: req.body.id})
        res.json({message: "Notifications cleared successfully", code: 200 });

    }catch(err){
        return  res.send({ message: "Internal error", code: 201 });
    }
}










//get coach details
const getCoach = async function (req, res) {

    try {
        // var details =  await Kid.find({user_id:req.user});
        var detail = await Coach.find({}).sort({ _id: -1 }).limit(1);;
        res.json({ detail, message: "Coach details fetched successfully", code: 200 });
    } catch (err) {
        return  res.send({ message: "Internal error", code: 201 });
    }
}

//show tg lines

const getHomeTagline = async function (req, res) {

    try {
        // var details =  await Kid.find({user_id:req.user});
        var detail = await Home.find();
        res.json({ detail, message: "Home page line line fetched successfully", code: 200 });
    } catch (err) {
        return  res.send({ message: "Internal error", code: 201 });
    }
}

//get T & C

const getTermsConditions = async function (req, res) {

    try {
        // var details =  await Kid.find({user_id:req.user});
        var terms = await Terms.find();
        res.json({ terms, message: "T&C fetched successfully", code: 200 });
    } catch (err) {
        return res.send({ message: "Internal error", code: 201 });
    }
}

// store location
const storeLocation = async function (req, res) {

    const userInfo = await User.findById({_id: req.user});

    if (userInfo.validate === false) {
        return res.send({ message: "Email doesn't exists. Please register.", code: 201 })
    }

    const newLocation = new Location({
        addressLine1: req.body.addressLine1,
        addressLine2: req.body.addressLine2,
        city: req.body.city,
        country: req.body.country,
        pincode: req.body.pincode,
        lat: req.body.lat,
        long: req.body.long
    });
    newLocation.save()
        .then(newLocation => res.json({ newLocation, message: "New location added successfully", code: 200 }))
        .catch(err =>  res.send({ message: "Internal error", code: 201 }))

}


//show location

const getLocation = async function (req, res) {

    try {

        var detail = await Location.find({}).sort({ _id: -1 }).limit(1);
        res.json({ detail, message: "Location fetched successfully", code: 200 });
    } catch (err) {
        return  res.send({ message: "Internal error", code: 201 });
    }
}
const getUsers = async function (req, res) {

    try {

        var detail = await User.find({}).sort({ _id: -1 });
        res.json({ detail, message: "User details fetched successfully", code: 200 });
    } catch (err) {
        return  res.send({ message: "Internal error", code: 201 });
    }
}
const getAllKids = async function (req, res) {

    try {

        var detail = await Kid.find({}).sort({ _id: -1 });
        res.json({ detail, message: "Kids details fetched successfully", code: 200 });
    } catch (err) {
        return  res.send({ message: "Internal error", code: 201 });
    }
}

const editUser = async function (req, res) {

    try {

        var detail = await User.find({}).sort({ _id: -1 });
        res.json({ detail, message: "User details fetched successfully", code: 200 });
    } catch (err) {
        return  res.send({ message: "Internal error", code: 201 });
    }
}

const getAllBookings = async function (req, res) {

    try {

        var detail =  await Booking.find({}).sort({ _id: -1 });
        res.json({ detail, message: "Booking details fetched successfully", code: 200 });
    } catch (err) {
        return  res.send({ message: "Internal error", code: 201 });
    }
}



module.exports = {
    addKid, createPacakage, getPacakage, getKidsDetail, createSlot, getSlotDetail, bookSlot, homeTagLine, getSlotByPlanId,
    homeTagLine, getHomeTagline, storeLocation, getLocation, updateKidDetails, getPlanDetails, addCoach, getCoach, notifyUser, createTerms,
    getTermsConditions,  getUsers, getAllKids, getAllBookings, contactUs, getnotification, readAllNotifications, clearAllNotification, clearByNotificationId 
};





