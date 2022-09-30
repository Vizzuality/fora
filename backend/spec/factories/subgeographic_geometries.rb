FactoryBot.define do
  factory :subgeographic_geometry do
    geometry { RGeo::GeoJSON.decode({type: "Polygon", coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1]]]}.to_json) }
  end
end
