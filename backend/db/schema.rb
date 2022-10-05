# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_09_29_094604) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "postgis"

  create_table "subgeographic_geometries", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.geometry "geometry", limit: {:srid=>0, :type=>"geometry"}, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "subgeographics", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "subgeographic_geometry_id"
    t.uuid "parent_id"
    t.string "geographic", null: false
    t.string "name", null: false
    t.string "code", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["geographic", "name"], name: "uniq_name_without_parent_id", unique: true, where: "(parent_id IS NULL)"
    t.index ["geographic", "parent_id", "name"], name: "uniq_name_with_parent_id", unique: true, where: "(parent_id IS NOT NULL)"
    t.index ["parent_id"], name: "index_subgeographics_on_parent_id"
    t.index ["subgeographic_geometry_id"], name: "index_subgeographics_on_subgeographic_geometry_id"
  end

  add_foreign_key "subgeographics", "subgeographic_geometries", on_delete: :cascade
  add_foreign_key "subgeographics", "subgeographics", column: "parent_id", on_delete: :cascade
end
