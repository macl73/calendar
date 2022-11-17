import React from 'react';
import PropTypes from 'prop-types';

function Calendar (props) {
    const {date} = props;
    
    const year = new Date().getFullYear();
    const month = new Date().getMonth();

    const lastDay = new Date(year, month + 1, 0).getDate();

    const firstDayWeekday = weekdayToRus(1);
    const lastDayWeekday = weekdayToRus(lastDay);

    function weekdayToRus(day) {
        if (new Date(year, month, day).getDay() === 0) {
            return 7;
        } else {
            return new Date(year, month, day).getDay() - 1;
        };
    };

    const calendarArr = [];

    for (let i = 1; i <= lastDay; i++) {
        calendarArr.push({num: i, id: i, class: "thisMonth"});
      };
      
      for (let i = 1; i <= (6 - lastDayWeekday); i++) {
        calendarArr.push({num: i, id: (i + 100), class: "otherMonth"});
      };
      
      const prevMonthLastDay = new Date(year, month, 0).getDate();
      
      for (let i = prevMonthLastDay; i >= (prevMonthLastDay - firstDayWeekday + 1); i--) {
        calendarArr.unshift({num: i, id: (i + 100), class: "otherMonth"});
      };
      
      const calendarRows = [];
      
      for (let i = 0; i < (calendarArr.length / 7); i++) {
        calendarRows.push([]);
        for (let j = 0; j < 7; j++) {
          calendarRows[i].push(calendarArr[7 * i + j]);
        };
      };

    function rowBuilder(array) {
        return array.map(arr => <tr key={arr[0].id}>{arr.map(el => <td key={el.id} className={el.class}>{el.num}</td>)}</tr>);
    };

    function weekdayToRussian(num) {
        const weekdays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        return weekdays[num.getDay()];
    };

    function monthToRussian(num, state = false) {
        const monthes = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        const pickedMonth = monthes[num.getMonth()].toString()
        if (state === true) {
            return pickedMonth.slice(0, pickedMonth.length - 1) + 'я';
        } else if (state === true && (num === 2 || num === 7)) {
            return pickedMonth + 'а';
        };
        return pickedMonth;
    };

    function todayDatepicker(day) {
        const td = day.getDate();
        setTimeout(() => {
            const trList = Array.from(document.getElementsByTagName("td"));
            trList.forEach(element => {
                if (element.textContent == td) {
                element.classList.add("ui-datepicker-today");   
                };
            }, 0);
        });
    };

    function otherMonthDatepicker() {
        setTimeout(() => {
            let others = Array.from(document.getElementsByClassName("otherMonth"));
            others.forEach(el => el.classList.add("ui-datepicker-other-month"));
        }, 0);
    };
    
    return (
        <div className="ui-datepicker">
            <div className="ui-datepicker-material-header">
                <div className="ui-datepicker-material-day">{weekdayToRussian(date)}</div>
                <div className="ui-datepicker-material-date">
                    <div className="ui-datepicker-material-day-num">{date.getDate()}</div>
                    <div className="ui-datepicker-material-month">{monthToRussian(date, true)}</div>
                    <div className="ui-datepicker-material-year">{date.getFullYear()}</div>
                </div>
            </div>
            <div className="ui-datepicker-header">
                <div className="ui-datepicker-title">
                    <span className="ui-datepicker-month">{monthToRussian(date)}</span>&nbsp;<span className="ui-datepicker-year">{date.getFullYear()}</span>
                </div>
            </div>
            <table className="ui-datepicker-calendar">
                <colgroup>
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col className="ui-datepicker-week-end" />
                    <col className="ui-datepicker-week-end" />
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col" title="Понедельник">Пн</th>
                        <th scope="col" title="Вторник">Вт</th>
                        <th scope="col" title="Среда">Ср</th>
                        <th scope="col" title="Четверг">Чт</th>
                        <th scope="col" title="Пятница">Пт</th>
                        <th scope="col" title="Суббота">Сб</th>
                        <th scope="col" title="Воскресенье">Вс</th>
                    </tr>
                </thead>
                <tbody className="table-of-days">
                    {rowBuilder(calendarRows)}
                </tbody>
                {todayDatepicker(date)}
                {otherMonthDatepicker()}
            </table>
        </div>
    )
}

Calendar.propTypes = {
    item: PropTypes.number
};

export default Calendar;