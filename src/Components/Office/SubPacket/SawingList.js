import React from "react";
import PageTopSection from "../../Common/PageTopSection";
import { connect } from "react-redux";

export const SawingList = (props) => {
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
        handleManageData={props.manageButtonFunction}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SawingList);
