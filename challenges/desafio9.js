db.trips.aggregate(
  [
    {
      $match: {
        $and: [
          {
            birthYear: { $exists: true },
          },
          { birthYear: { $ne: "" } },

        ],

      },
    },
    {
      $addFields: {
        maiorAnoNascimento: { $toInt: "$birthYear" },
        menorAnoNascimento: { $toInt: "$birthYear" },
      },
    },

    {
      $group: {
        _id: null,
        maiorAnoNascimento: { $max: "$maiorAnoNascimento" },
        menorAnoNascimento: { $min: "$menorAnoNascimento" },

      },
    },

    {
      $project: {
        _id: 0,
        maiorAnoNascimento: 1,
        menorAnoNascimento: 1,
      },
    },

  ],
);
