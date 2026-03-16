const express = require("express");


const auth = require("../middleware/auth");
const role = require("../middleware/role");
const TenderModel = require("../models/Tender");
const QuotationModel = require("../models/Quotation");

const quotationRouter = express.Router();

quotationRouter.get("/health", async (_request, _response) => {
    return _response.json({
        message: "Quotation router working..."
    });
});

// submit quotation 
quotationRouter.post("/", auth, role("TRADER"), async (_request, _response) => {
    try {

        const {tenderId, price, timeline, proposal} = _request.body;

        if(!tenderId || !price || !timeline || !proposal) {
            return _response.status(400).json({
                message: "Missing required fields",
                success: false
            });
        }
        //missing required fields

        const tender = await TenderModel.findById(tenderId);

        if (!tender) {
            return _response.status(404).json({
                message: "Tender not found",
                success: false
            });
        }
        //tender not found

        if(new Date() > tender.deadline) {
            return _response.status(400).json({
                message: "Deadline exceeded",
                success: false
            });
        }
        //deadline missed

        const existing = await QuotationModel.findOne({
            tender: tenderId,
            trader: _request.user._id
        });

        if (existing) {
            return _response.status(400).json({
                message: "You have already submitted a quotation for this tender",
                success: false,
            });
        }
        //to check if the trader has missed the tender deadline

        if (tender.status !== "OPEN") {
            return _response.status(400).json({
                message: "Tender not open anymore",
                success: false
            });
        };

        const quotation = await QuotationModel.create({
            tender: tenderId,
            trader: _request.user._id,
            price: price, 
            timeline: timeline,
            proposal: proposal
        });

        return _response.status(200).json({
            success: true,
            data: quotation
        });
        //success


    } catch(err) {
        return _response.status(500).json({
            messsage: "Server side error",
            error: err.message,
            success: false
        });
    }
});

// get my quotations 
quotationRouter.get("/my", auth, role("TRADER"), async (_request, _response) => {
    try {

        const myTenders = await QuotationModel.find({
            trader: _request.user._id,
        }).populate("tender");

        return _response.status(200).json({
            data: myTenders,
            success: true
        });
        
    } catch(err) {
        return _response.status(500).json({
            success: false,
            error: err.message,
            message: "Server side error"
        });
    }
});


// get quotations for tenders (router for organizations)
quotationRouter.get("/tender/:id", auth, role("ORG"), async (_request, _response) => {
    try {

        const tender = await TenderModel.findById(_request.params.id);

        if(!tender) {
            return _response.status(404).json({
                success: false,
                message: "Tender not found" 
            });
        }
        
        //only organizations can see        
        if (tender.organization.toString() != _request.user._id.toString()) {
            return _response.status(401).json({
                message: "You are not authorized to use this route",
                success: false
            });
        }

        const quotations = await QuotationModel.find({tender: _request.params.id}).populate("trader", "name email");

        return _response.status(200).json({
            data: quotations,
            success: true
        });

    } catch(err) {
        return _response.status(500).json({
            success: false,
            error: err.message,
            message: "Server side error"
        });
    }
});


module.exports = quotationRouter;
