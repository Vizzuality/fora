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

ActiveRecord::Schema[7.0].define(version: 2022_10_06_111547) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "postgis"

  create_table "active_storage_attachments", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.uuid "record_id", null: false
    t.uuid "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "funder_subgeographics", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "funder_id", null: false
    t.uuid "subgeographic_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["funder_id"], name: "index_funder_subgeographics_on_funder_id"
    t.index ["subgeographic_id"], name: "index_funder_subgeographics_on_subgeographic_id"
  end

  create_table "funders", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.text "description", null: false
    t.string "primary_office_address", null: false
    t.string "primary_office_city", null: false
    t.uuid "primary_office_state_id"
    t.uuid "primary_office_country_id", null: false
    t.string "primary_contact_first_name", null: false
    t.string "primary_contact_last_name", null: false
    t.string "primary_contact_email", null: false
    t.boolean "show_primary_email", default: false, null: false
    t.string "primary_contact_phone", null: false
    t.string "primary_contact_location", null: false
    t.string "primary_contact_role", null: false
    t.string "secondary_email_which_can_be_shared"
    t.string "website"
    t.datetime "date_joined_fora", null: false
    t.string "funder_type", null: false
    t.text "funder_type_other"
    t.string "capital_acceptances", null: false, array: true
    t.text "capital_acceptances_other"
    t.string "leadership_demographics", null: false, array: true
    t.text "leadership_demographics_other"
    t.integer "number_staff_employees", default: 0, null: false
    t.string "application_status", null: false
    t.string "funder_legal_status", null: false
    t.text "funder_legal_status_other"
    t.boolean "new_to_regenerative_ag", default: true, null: false
    t.text "networks"
    t.string "capital_types", null: false, array: true
    t.text "capital_types_other"
    t.boolean "spend_down_strategy", default: false, null: false
    t.string "areas", null: false, array: true
    t.text "areas_other"
    t.string "demographics", null: false, array: true
    t.text "demographics_other"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_funders_on_name", unique: true
    t.index ["primary_office_country_id"], name: "index_funders_on_primary_office_country_id"
    t.index ["primary_office_state_id"], name: "index_funders_on_primary_office_state_id"
  end

  create_table "subgeographic_geometries", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.geometry "geometry", limit: {:srid=>0, :type=>"geometry"}, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "subgeographic_hierarchies", id: false, force: :cascade do |t|
    t.uuid "ancestor_id", null: false
    t.uuid "descendant_id", null: false
    t.integer "generations", null: false
    t.index ["ancestor_id", "descendant_id", "generations"], name: "subgeographic_anc_desc_idx", unique: true
    t.index ["ancestor_id"], name: "index_subgeographic_hierarchies_on_ancestor_id"
    t.index ["descendant_id"], name: "index_subgeographic_hierarchies_on_descendant_id"
    t.index ["descendant_id"], name: "subgeographic_desc_idx"
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

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "funder_subgeographics", "funders", on_delete: :cascade
  add_foreign_key "funder_subgeographics", "subgeographics", on_delete: :cascade
  add_foreign_key "funders", "subgeographics", column: "primary_office_country_id", on_delete: :cascade
  add_foreign_key "funders", "subgeographics", column: "primary_office_state_id", on_delete: :cascade
  add_foreign_key "subgeographic_hierarchies", "subgeographics", column: "ancestor_id", on_delete: :cascade
  add_foreign_key "subgeographic_hierarchies", "subgeographics", column: "descendant_id", on_delete: :cascade
  add_foreign_key "subgeographics", "subgeographic_geometries", on_delete: :cascade
  add_foreign_key "subgeographics", "subgeographics", column: "parent_id", on_delete: :cascade
end
