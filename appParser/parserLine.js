module.exports = (line) => {
	var record = {};
    if(line.charAt(0) !== '<' ){

        return {
            systemType: "header",
            description: "Header",
            value: line,
        }
    } else if (line.substring(0,10) == '<ADIF_VER:') {
      //  console.log(`adif version: ${line.substring(12,line.length)} `);
        return {
            systemType: "adif_ver",
            description: "Identifies the version of ADIF used in this file in the format X.Y.Z where",
            value: line.substring(13,line.length),
        }
    } else if (line.substring(0,11) == '<PROGRAMID:') {
     //   console.log(`program id: ${line.substring(13,line.length)} `);
        return {
            systemType: "programid",
            description: "Identifies the name of the logger, converter, or utility that created or processed this ADIF file",
            value: line.substring(13,line.length),
        }
    } else if (line.substring(0,16) == '<PROGRAMVERSION:') {
   //     console.log(`program version: ${line.substring(18,line.length)} `);
        return {
            systemType: "programversion",
            description: "Identifies the version of the logger, converter, or utility that created or processed this ADIF file",
            value: line.substring(18,line.length),
        }
    } else if(line.substring(0,5) == '<EOH>'){
        return {
            systemType: "end-of-header",
            description: "End of header",
            value: "",
        }
    } else if (line.substring(0,1) == '<') {
        const fields = line.split('<');

        for( var i=0; i<fields.length; i++ ){
            var field = fields[i], 
                fieldName = field.split(':')[0],
                fieldValue = field.split('>')[1];
            if( fieldName.length && fieldName != 'EOR>' && fieldValue && fieldValue.length){
                fieldName = fieldName.trim().toLowerCase();
                fieldValue = fieldValue.trim();
                record[ fieldName ] = fieldValue;
            }
            
        }
        if( record.qso_date ){
            var qso_date = new Date( Date.UTC( record.qso_date.slice(0,4),
                                                   (record.qso_date.slice(4,6) - 1),
                                                   record.qso_date.slice(6,8),
                                                   record.time_on.slice(0,2),
                                                   record.time_on.slice(2,4),
                                                   record.time_on.slice(4)) );
            record.qso_date = qso_date;
            record.systemType = 'userRecords'
            delete record[ 'time_on' ]
            delete record[ 'time_off' ]	
        }
        return record;
    }
}