import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import X2JS from 'x2js';
const FileTable  = ({files}) => {
    return (
        <div className="container-fluid">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Content Preview</th>
                        <th>Download</th>
                    </tr>
                </thead>
                <tbody>
                {renderFilesInTable(files)}
                </tbody>
            </table>
        </div>
    );
};

function renderFilesInTable(files) {
    return files.map((file,index) => {
        let filePreview = file.content.replace(/\s/g, '').replace(/[\r\n]+/g," ").substring(0, 150);
        let newFileNameArray = file.name.split('.');
        newFileNameArray[newFileNameArray.length -1 ] = 'XML';
        let newFileName = newFileNameArray.join('.');
        return  (<tr key={file.name+index}>
            <th scope="row">{index}</th>
            <td>{file.name}</td>
            <td>{filePreview}</td>
            <td><a href="" className="btn btn-success" onClick={downloadXMLString(file, newFileName)}>
                <i className="fas fa-cloud-download-alt"></i>{newFileName}
                </a></td>
        </tr>);

    })
}

function downloadXMLString(jsonfile, nfn) {
    return (e) => {
        e.preventDefault();
        const x2js = new X2JS();
        let json = JSON.parse(jsonfile.content);
        let xmlString = x2js.js2xml(json);
        console.log(nfn, xmlString);
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(xmlString));
        element.setAttribute('download', nfn);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

}

export default FileTable;