let [year, month, date] = readline().split(' ').map(val => parseInt(val));
if(month === 2 && date > 28){
    if(!((year%4 === 0 && year % 100 !== 0) || (year % 400 === 0) || (year%3200 === 0 && year%172800 ===0))){
        month = '03';
        date = '01';
    } else {
        month = '02';
        if(date >= 10){
            date = '' + date;
        }else {
            date = '0' + date;
        }
    }
}
if(month === 1 || month === 3 || month === 5 || month === 7 || month ===8|| month === 10 || month === 12){
    if(date > 31){
        date = '01';
        if(month === 12){
            month = '01';
            year = year + 1;
            year = '' + year;
        }else{
            month = month + 1;
            month = '' + month;
        }
    }
}else{
    if(date > 30){
        date = '01';
        month = month + 1;
        month = '' + month;
    }
}
print(year + '-' + month + '-' + date);

