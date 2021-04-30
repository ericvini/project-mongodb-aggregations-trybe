db.trips.aggregate(
  [

    {
      $match: {
        startTime: { $exists: true },
        stopTime: { $exists: true },
      },
    },

    {
      $addFields: {
        duration: { $subtract: ["$stopTime", "$startTime"] },
      },
    },

    {
      $group: {
        _id: "$usertype",
        duracaoMedia: { $avg: "$duration" },

      },
    },
    {
      $sort: {
        duracaoMedia: 1,

      },
    },
    {
      $project: {
        _id: 0,
        tipo: "$_id",
        duracaoMedia: { $round: [{ $divide: ["$duracaoMedia", 3600000] }, 2] },

      },
    },

  ],
);
