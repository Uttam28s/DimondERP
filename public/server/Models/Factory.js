const mongoose = require("mongoose");
const {NULL} = require("node-sass");

const objSchema = mongoose.Schema(
    {
        rough_id: {
            type: mongoose.ObjectId,
            ref: "Rough",
            required: true,
        },
        factory_total_carat: Number,
        // office_total_piece: Number,
        factory_assigne_name: String,
        assign_date: Date,
        returnStatus: Boolean,
        return_date: Date,
        carat: Number,
        id: String,
        // copyCarat: Number,
        //  total_packet: Number,
        copyCarat: Number,
        packetNo: Number,
        all_process: Array,
        occupy: Boolean,
        lastCarat: Number,

        // office_return_sorting_carat: Number,
        //   mackable: Number
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Factory", objSchema);
