const linkFomatter = React.createClass({
  render(){
    return(
      <a href={this.props.dependentValues.url}>{this.props.dependentValues.name}</a>
    );
  }
});


function MyFunctionalDataTable(props){
  const myCols = [
    {key: "link", name: "Link", width: 200, formatter: linkFomatter, getRowMetaData: (data)=>(data)},
    ...
   ];

  const createRowData = !props.mydata? '' :
    props.mydata.map(function(obj, index){
      return {"blah": obj.blah,
              "url": obj.url, //doesn't have to match a GUI column
              "name": obj.name, //doesn't have to match a GUI column 
              "column2stuff": obj.blahblah,
      }
  });

  const rowGetter = rowNumber => createRowData[rowNumber];


  return (
    <ReactDataGrid
      columns={myCols}
      rowGetter={rowGetter}
      rowsCount={createRowData.length}
      headerRowHeight={35}
      rowHeight={35}
      minHeight={createRowData.length<15? (37+(35*createRowData.length)) : 500}
    />

  )
}