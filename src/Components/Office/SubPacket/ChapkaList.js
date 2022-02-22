import React from "react";
import PageTopSection from "../../Common/PageTopSection";
import { connect } from "react-redux";

export const ChapkaList = (props) => {
  return (
    <div>
      <PageTopSection
        noButton
        rowData={props.rowData}
        column={props.column}
        pageSize={props.pageSize}
        totalData={props.totalData}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ChapkaList);
