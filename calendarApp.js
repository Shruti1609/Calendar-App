function main() {
    const args = process.argv.slice(2);

    if (args.length !== 3) {
        throw new Error("Please provide exactly 3 arguments: <month> <year> <startdayOfTheWeek>");
    }

    const [month, year, startDay] = args;

    const validatedMonth = validateMonth(Number(month));
    const validatedYear = validateYear(Number(year));
    const validatedStartDay = validateStartDay(startDay);

    printCalendar(validatedMonth, validatedYear, validatedStartDay);
}

// Validates the month input (1-12)
function validateMonth(month) {
    if (month < 1 || month > 12) {
        throw new Error("Month must be in the range 1-12.");
    }
    return month;
}

// Validates the year input (1980-2030)
function validateYear(year) {
    if (year < 1980 || year > 2030) {
        throw new Error("Year must be in the range 1980-2030.");
    }
    return year;
}

// Validates the start day input (Su, Mo, Tu, We, Th, Fr, Sa)
function validateStartDay(day) {
    const validDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa","su", "mo", "tu", "we", "th", "fr", "sa", "SU", "MO", "TU", "WE", "TH", "FR", "SA"];
    if (!validDays.includes(day)) {
        throw new Error("Start day must be one of: Su, Mo, Tu, We, Th, Fr, Sa, mo, tu, we, th, fr, sa, SU, MO, TU, WE, TH, FR, SA.");
    }
    return day;
}

// Generates and prints the calendar for the given month, year, and start day
function printCalendar(month, year, startDay) {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const daysInWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const daysInMonth = new Date(year, month, 0).getDate();

    const startDayIndex = daysInWeek.indexOf(startDay);
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();

    // Align the weekday order to start from the given start day
    const reorderedWeekdays = [...daysInWeek.slice(startDayIndex), ...daysInWeek.slice(0, startDayIndex)];

    console.log(`****${monthNames[month - 1].toUpperCase()} ${year}****`);
    console.log(reorderedWeekdays.join(" "));

    let dayOffset = (firstDayOfMonth - startDayIndex + 7) % 7;
    let currentDay = 1;

    while (currentDay <= daysInMonth) {
        let week = new Array(7).fill("  "); // Placeholder for the week
        for (let i = 0; i < 7; i++) {
            if (dayOffset === 0 && currentDay <= daysInMonth) {
                week[i] = currentDay.toString().padStart(2, " ");
                currentDay++;
            }
            dayOffset = Math.max(dayOffset - 1, 0);
        }
        console.log(week.join(" "));
    }
}

// Start the script
main();