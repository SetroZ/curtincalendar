

export const scrapDataExample = [
  null,
  [
    {
      type: 'Lecture (1)',
      location: false,
      time: {
        start: {
          hour: 16,
          minutes: 0,
        },
        end: {
          hour: 17,
          minutes: 0,
        },
        differenceInMinutes: 60,
      },
      title: '\t\t\t\t\t\t\t\t\t\tNPSC1003\n\t\t\t\t\t\t\t\t\t\t',
    },
    {
      type: 'Computer Laboratory (10)',
      location: {
        floor: 2,
        coordinates: {
          long: -32.00742353601639,
          lat: 115.89582650747299,
        },
        placeName: ['314 (New Technologies)'],
        room: '219',
      },
      time: {
        start: {
          hour: 12,
          minutes: 0,
        },
        end: {
          hour: 14,
          minutes: 0,
        },
        differenceInMinutes: 120,
      },
      title: '\t\t\t\t\t\t\t\t\t\tCOMP1002\n\t\t\t\t\t\t\t\t\t\t',
    },
    {
      type: 'Seminar (6)',
      location: {
        floor: 1,
        coordinates: {
          long: -32.00847410511355,
          lat: 115.89418851506605,
        },
        placeName: ['202 (Design and Art Precinct)'],
        room: '122',
      },
      time: {
        start: {
          hour: 10,
          minutes: 0,
        },
        end: {
          hour: 11,
          minutes: 0,
        },
        differenceInMinutes: 60,
      },
      title: '\t\t\t\t\t\t\t\t\t\tISEC2001\n\t\t\t\t\t\t\t\t\t\t',
    },
    {
      type: 'Workshop (15)',
      location: {
        floor: 1,
        coordinates: {
          long: -32.00929255343602,
          lat: 115.89433482256133,
        },
        placeName: ['212 (Design and Art Precinct)'],
        room: '107',
      },
      time: {
        start: {
          hour: 8,
          minutes: 0,
        },
        end: {
          hour: 10,
          minutes: 0,
        },
        differenceInMinutes: 120,
      },
      title: '\t\t\t\t\t\t\t\t\t\tNPSC1003\n\t\t\t\t\t\t\t\t\t\t',
    },
  ],
  [
    {
      type: 'Workshop (1)',
      location: {
        floor: 1,
        coordinates: {
          long: -32.00674551403124,
          lat: 115.89373803797264,
        },
        placeName: ['210 (Building 210)'],
        room: '101',
      },
      time: {
        start: {
          hour: 14,
          minutes: 0,
        },
        end: {
          hour: 17,
          minutes: 0,
        },
        differenceInMinutes: 180,
      },
      title: '\t\t\t\t\t\t\t\t\t\tISEC2001\n\t\t\t\t\t\t\t\t\t\t',
    },
  ],
  [
    {
      type: 'Lecture (1)',
      location: {
        floor: 2,
        coordinates: {
          long: -32.00387127621524,
          lat: 115.8952942180266,
        },
        placeName: ['405 (Curtin School of Nursing)'],
        room: '201',
      },
      time: {
        start: {
          hour: 16,
          minutes: 0,
        },
        end: {
          hour: 18,
          minutes: 0,
        },
        differenceInMinutes: 120,
      },
      title: '\t\t\t\t\t\t\t\t\t\tCOMP1000\n\t\t\t\t\t\t\t\t\t\t',
    },
    {
      type: 'Lecture (1)',
      location: {
        floor: 2,
        coordinates: {
          long: -32.00386352857474,
          lat: 115.89435370252943,
        },
        placeName: ['403 (Ken Hall Lecture Theatre)'],
        room: '101',
      },
      time: {
        start: {
          hour: 14,
          minutes: 0,
        },
        end: {
          hour: 16,
          minutes: 0,
        },
        differenceInMinutes: 120,
      },
      title: '\t\t\t\t\t\t\t\t\t\tCOMP1002\n\t\t\t\t\t\t\t\t\t\t',
    },
    {
      type: 'Computer Laboratory (6)',
      location: {
        floor: 1,
        coordinates: {
          long: -32.00731819227635,
          lat: 115.89595596696434,
        },
        placeName: ['314 (New Technologies)'],
        room: '115',
      },
      time: {
        start: {
          hour: 10,
          minutes: 0,
        },
        end: {
          hour: 12,
          minutes: 0,
        },
        differenceInMinutes: 120,
      },
      title: '\t\t\t\t\t\t\t\t\t\tCOMP1000\n\t\t\t\t\t\t\t\t\t\t',
    },
  ],
];
const type = {
  type: 'Computer Laboratory (6)',
  location: {
    floor: 1,
    coordinates: {
      long: -32.00731819227635,
      lat: 115.89595596696434,
    },
    placeName: ['314 (New Technologies)'],
    room: '115',
  },
  time: {
    start: {
      hour: 10,
      minutes: 0,
    },
    end: {
      hour: 12,
      minutes: 0,
    },
    differenceInMinutes: 120,
  },
  title: '\t\t\t\t\t\t\t\t\t\tCOMP1000\n\t\t\t\t\t\t\t\t\t\t',
};
export type scrapDataType = typeof type;
