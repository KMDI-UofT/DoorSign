ics_sources = [
    //CORS problem
    //{url:'https://outlook.office365.com/owa/calendar/7e6c037200a54bbb89870bdf7153444e@utoronto.ca/0222599322974e3a84fb22a53974a24b6817473586409478242/calendar.ics  ',event_properties:{color:'gold'}},
    //do a cron update instead
    {url:'./calendar/calendar.ics'},
    //{url:'samples/daily_recur.ics',event_properties:{className:['daily-recur'], url:'http://recurring.events.example.org/'}}
    //{url:'samples/events-noend.ics',event_properties:{color:'pink'}},
]


function data_req (url, callback) {
    req = new XMLHttpRequest()
    req.addEventListener('load', callback)
    req.open('GET', url)
    req.send()
}

function add_recur_events() {
    if (sources_to_load_cnt < 1) {
        $('#calendar').fullCalendar('addEventSource', expand_recur_events)
    } else {
        setTimeout(add_recur_events, 30)
    }
}

function load_ics(ics){
    data_req(ics.url, function(){
        $('#calendar').fullCalendar('addEventSource', fc_events(this.response, ics.event_properties))
        sources_to_load_cnt -= 1
    })
}

$(document).ready(function() {
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next,today ',
            center: 'title',
            right: ''
        },
        //basicWeek agendaWeek
        defaultView: 'basicWeek', //options https://stackoverflow.com/questions/9562475/jquery-full-calendar-default-view-setting
        defaultDate: new Date(),
        height: 600,
    })
    sources_to_load_cnt = ics_sources.length
    ics_sources.forEach(function(ics){
      load_ics(ics)
    })
    add_recur_events()
})
