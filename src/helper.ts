import { DateTime } from 'ts-luxon';

const timeFromPostTime = (time: string) => {
    const start = DateTime.now();
    const createdAtPost = DateTime.fromISO(time);

    const differenceBetween = start.diff(createdAtPost, 'minutes');
    let obj = differenceBetween?.toObject();

    if (obj) {
      let minutes = obj.minutes;
      if (minutes === undefined) {
        return null;
      }
      if (minutes < 3) {
        return `Now... `;
      }
      if (minutes < 60) {
        return `${Math.round(minutes)}m `;
      }
      if (minutes > 60) {
        const hours = differenceBetween.shiftTo('hours').toObject();
        let time = hours.hours ?? undefined;

        if (time) {
          let round = Math.round(time);
          if (round <= 24) {
            return `${round}h`;
          } else {
            const days = differenceBetween.shiftTo('days', 'hours').toObject();
            let time = days.days ?? undefined;
            let hours = days.hours ?? undefined;

            if (time && hours) {
              return `${time}d${Math.round(hours)}h`;
            }
          }
        }
      }
    }
    return null;
  };

  export default timeFromPostTime