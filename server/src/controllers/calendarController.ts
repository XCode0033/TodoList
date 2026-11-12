import axios from 'axios'
import * as ical from "node-ical"
import type { VEvent } from "node-ical"

import { RequestHandler } from 'express'

export const getCalendar:RequestHandler = async(req, res) => {
    
    try{
        const response = await axios.get<string>(
            process.env.CALENDAR_FEED_URL!,
            {
                responseType: "text",
                timeout: 10000
            }
        );
        
        const calendar = await ical.async.parseICS(response.data)
        console.log(calendar)

      const events = Object.values(calendar)
    .filter((item): item is VEvent => item?.type === "VEVENT")
    .map((event) => ({
        id: event.uid,
        title: event.summary,
        start: event.start,
        end: event.end
    }));

res.json(events);

    }catch(error){
        console.error('Could not download calendar', error)

        res.status(502).json({
            message: 'Could not load the calendar.'
        })
    }
}