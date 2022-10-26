FactoryBot.define do
  factory :widget_data do
    widget
    filter_key { nil }
    data {
      {
        headers: [
          {
            label: "Total number of FORA members",
            value: "total_number"
          },
          {
            label: "Total number of projects",
            value: "total_projects"
          }
        ],
        data: [
          [
            {value: 68},
            {value: 78}
          ]
        ]
      }
    }
  end
end
