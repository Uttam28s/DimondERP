import React from "react";
import PageTopSection from "../../Common/PageTopSection";
import { connect } from "react-redux";

export const FactorySubRough = (props) => {
    return (
        <div>
            <PageTopSection
                // noButton
                rowData={props.rowData}
                column={props.column}
                pageSize={props.pageSize}
                totalData={props.totalData}
                edit={props.edit}
                remove={props.remove}

                button="Close Sub Packet"
                title="Sub Office"
                subClose={props.subClose}
                handelModelTabChange={props.handelModelTabChange}
                tabSelected={props.tabSelected}
            />
        </div>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FactorySubRough);
