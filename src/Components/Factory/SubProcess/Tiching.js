import React from "react";
import PageTopSection from "../../Common/PageTopSection";
import {connect} from "react-redux";

export const Tiching = (props) => {
    return (
        <div>
            <PageTopSection
                noButton
                rowData={props.rowData}
                column={props.column}
                pageSize={props.pageSize}
                totalData={props.totalData}
                colour={true}
                edit={props.edit}
                remove={props.remove}
            />
        </div>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Tiching);
