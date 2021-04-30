db.trips.aggregate(
  [

    {
      $match: {

        startTime: {
          $gte: ISODate("2016-03-10"),
          $lte: ISODate("2016-03-11"),

        },

      },
    },
    {
      $addFields: {
        duracao: { $subtract: ["$stopTime", "$startTime"] },
      },
    },

    {
      $group: {
        _id: null,
        avgduracao: { $avg: "$duracao" },

      },
    },

    {
      $project: {
        _id: 0,
        duracaoMediaEmMinutos: { $ceil: { $divide: ["$avgduracao", 60000] } },

      },
    },

  ],
);
