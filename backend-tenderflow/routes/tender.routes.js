const express = require("express");
const TenderModel = require("../models/Tender");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const { Mongoose } = require("mongoose");
const UserModel = require("../models/User");
const QuotationModel = require("../models/Quotation");

const tenderRouter = express.Router();

tenderRouter.get("/health", (_request, _response) => {

    return _response.json({
        "message": "Tender router working..."
    });

});

// created tenders 
tenderRouter.post("/", auth, role("ORG"), async (_request, _response) => {

    try {

        const {title, description, budget, category, deadline} = _request.body;

        if(!title || !budget || !deadline) {
            return _response.status(400).json({
                message: "Missing required fields... (title, budget, deadline)",
                success: false,
            });
        }

        const tender = await TenderModel.create({
            title: title,
            description: description,
            budget: budget,
            category: category,
            deadline: deadline,
            organization: _request.user._id
        });

        return _response.status(200).json({
            success: true,
            data: tender
        });


    } catch(err) {

        return _response.status(500).json({
            message: "Server side error",
            error: err.message,
            success: false
        });

    }
});

tenderRouter.get("/my", auth, async (_request, _response) => {

    try {

        const openTenders = await TenderModel.find({ organization: _request.user._id}).populate("organization", "name email");

        return _response.json({
            success: true,
            data: openTenders 
        });
        
    } catch(err) {

        return _response.status(500).json({
            message: "Server side error",
            error: err.message,
            success: false
        });

    }
});

// get all open routes 
tenderRouter.get("/", auth, async (_request, _response) => {

    try {

        const openTenders = await TenderModel.find().populate("organization", "name email");

        return _response.json({
            success: true,
            data: openTenders 
        });
        
    } catch(err) {

        return _response.status(500).json({
            message: "Server side error",
            error: err.message,
            success: false
        });

    }
});

// get single tender 
tenderRouter.get("/:id", async (_request, _response) => {

    try {

        const tender = await TenderModel.findById(_request.params.id).populate("organization", "name email");

        if (!tender) {
            return _response.status(404).json({
                success: fail,
                message: "Tender not found"
            });
        }

        return _response.status(200).json({
            success: true,
            data: tender
        });

    } catch(err) {

        return _response.status(500).json({
            message: "Server side error",
            success: fail,
            error: err.message
        });

    }

});

//award tender 
tenderRouter.post("/:id/award", auth, role("ORG"), async (_request, _response) => {
    try {

        const { quotationId } = _request.body;
        const tenderId = _request.params.id;

        if(!quotationId) { 
            return _response.status(400).json({
                message: "Quotation Id not found",
                success: fail
            });
        }
        // to check if quotationId is present or not 

        const tender = await TenderModel.findById(tenderId);

        if(!tender) {
            return _response.status(404).json({
                message: "Tender not found",
                success: false
            });
        }
        // tender exists in db or not 

        if(tender.organization.toString() !== _request.user._id.toString()) {
            return _response.status(403).json({
                message: "Not enough permissions",
                success: false
            });
        }
        //only the owning organizations can execute this route
        
        if(tender.status !== "OPEN") {
            return _response.status(400).json({
                message: "Tender already awarded",
                success: false
            });
        }
        // if the tender is already awarded

        const quotation = await QuotationModel.findById(quotationId);

        if(!quotation){
            return _response.status(404).json({
                message: "Quotation not found",
                success: false
            });
        }

        if(quotation.tender.toString() !== tenderId){
            return _response.status(400).json({
                message: "Quotation does not belong to this tender",
                success: false
            });
        }
        // to see if the quotation belongs to this tender or not 

        quotation.status = "ACCEPTED";
        await quotation.save();

        await QuotationModel.updateMany(
            {
                tender: tenderId, 
                _id: {
                    $ne: quotationId
                }
            },
            {$set: {status: "REJECTED"}}
        );
        // rejected every other quotation than the one we wanna award 

        tender.status = "AWARDED";
        await tender.save();
        //saving the tender's status as accepted 

        return _response.status(200).json({
            success: true,
            message: "Tender awarded successfully"
        });

    } catch(err) {
        return _response.json({
            success: false,
            error: err.message,
            message: "Server side error"
        });
    }
});

module.exports = tenderRouter;
