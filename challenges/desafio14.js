db.trips.aggregate(
  [

    {
      $addFields: {
        duracao: { $subtract: ["$stopTime", "$startTime"] },
      },
    },

    {
      $group: {
        _id: "$bikeid",
        avgDuration: { $avg: "$duracao" },

      },
    },

    {
      $project: {
        _id: 0,
        bikeId: "$_id",
        duracaoMedia: { $ceil: { $divide: ["$avgDuration", 60000] } },

      },
    },
    {
      $sort: { duracaoMedia: -1 },
    },

    { $limit: 5 },

  ],
);
