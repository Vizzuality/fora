# frozen_string_literal: true

require "rails_helper"

RSpec.configure do |config|
  config.swagger_root = Rails.root.join("swagger").to_s

  config.after :each, generate_swagger_example: true do |example|
    example.metadata[:response][:content] = {
      "application/json" => {example: JSON.parse(response.body, symbolize_names: true)}
    }
  end

  config.swagger_docs = {
    "v1/swagger.yaml" => {
      openapi: "3.0.1",
      info: {
        title: "API V1",
        version: "v1"
      },
      paths: {},
      components: {
        securitySchemes: {
        },
        schemas: {
          funder: {
            type: :object,
            properties: {
              id: {type: :string},
              type: {type: :string},
              attributes: {
                type: :object,
                properties: {
                  name: {type: :string},
                  description: {type: :string},
                  primary_office_city: {type: :string},
                  primary_contact_first_name: {type: :string},
                  primary_contact_last_name: {type: :string},
                  primary_contact_phone: {type: :string},
                  primary_contact_location: {type: :string},
                  primary_contact_role: {type: :string, enum: Role::TYPES},
                  website: {type: :string, nullable: true},
                  date_joined_fora: {type: :string},
                  funder_type: {type: :string, enum: FunderType::TYPES},
                  funder_type_other: {type: :string},
                  capital_acceptances: {type: :array, items: {type: :string, enum: CapitalAcceptance::TYPES}},
                  capital_acceptances_other: {type: :string},
                  leadership_demographics: {type: :array, items: {type: :string, enum: Demographic::TYPES}},
                  leadership_demographics_other: {type: :string},
                  number_staff_employees: {type: :number},
                  application_status: {type: :string, enum: ApplicationStatus::TYPES},
                  funder_legal_status: {type: :string, enum: FunderLegalStatus::TYPES},
                  funder_legal_status_other: {type: :string},
                  new_to_regenerative_ag: {type: :boolean},
                  networks: {type: :string, nullable: true},
                  capital_types: {type: :array, items: {type: :string, enum: CapitalType::TYPES}},
                  capital_types_other: {type: :string},
                  spend_down_strategy: {type: :boolean},
                  areas: {type: :array, items: {type: :string, enum: Area::TYPES}},
                  areas_other: {type: :string},
                  demographics: {type: :array, items: {type: :string, enum: Demographic::TYPES}},
                  demographics_other: {type: :string},
                  contact_email: {type: :string},
                  logo: {"$ref" => "#/components/schemas/image_blob", :nullable => true}
                }
              },
              relationships: {
                type: :object,
                properties: {
                  primary_office_state: {"$ref" => "#/components/schemas/nullable_response_relation"},
                  primary_office_country: {"$ref" => "#/components/schemas/response_relation"},
                  subgeographics: {"$ref" => "#/components/schemas/response_relations"},
                  subgeographic_ancestors: {"$ref" => "#/components/schemas/response_relations"}
                }
              }
            },
            required: %w[id type attributes relationships]
          },
          subgeographic: {
            type: :object,
            properties: {
              id: {type: :string},
              type: {type: :string},
              attributes: {
                type: :object,
                properties: {
                  name: {type: :string},
                  code: {type: :string},
                  geographic: {type: :string},
                  created_at: {type: :string},
                  updated_at: {type: :string}
                },
                required: %w[name code geographic created_at updated_at]
              },
              relationships: {
                type: :object,
                properties: {
                  parent: {"$ref" => "#/components/schemas/nullable_response_relation"},
                  subgeographics: {"$ref" => "#/components/schemas/response_relations"}
                }
              }
            },
            required: %w[id type attributes relationships]
          },
          subgeographic_geojson: {
            type: :object,
            properties: {
              type: {type: :string},
              features: {
                type: :array,
                items: {
                  type: :object,
                  properties: {
                    type: {type: :string},
                    geometry: {
                      type: :object,
                      properties: {
                        type: {type: :string},
                        coordinates: {type: :array}
                      },
                      required: %w[type coordinates]
                    },
                    properties: {
                      type: :object,
                      properties: {
                        id: {type: :string},
                        code: {type: :string},
                        name: {type: :string},
                        parent_id: {type: :string, nullable: true}
                      },
                      required: %w[id code name parent_id]
                    }
                  },
                  required: %w[type geometry properties]
                }
              }
            },
            required: %w[type features]
          },
          image_blob: {
            type: :object,
            properties: {
              small: {type: :string, nullable: true},
              medium: {type: :string, nullable: true},
              original: {type: :string, nullable: true}
            },
            required: %w[small medium original]
          },
          pagination_meta: {
            type: :object,
            properties: {
              page: {type: :integer},
              per_page: {type: :integer},
              from: {type: :integer},
              to: {type: :integer},
              total: {type: :integer},
              pages: {type: :integer}
            },
            required: %w[page per_page from to total pages]
          },
          pagination_links: {
            type: :object,
            properties: {
              first: {type: :string},
              self: {type: :string},
              last: {type: :string}
            },
            required: %w[first self last]
          },
          nullable_response_relation: {
            type: :object,
            properties: {
              data: {
                type: :object,
                nullable: true,
                properties: {
                  id: {type: :string},
                  type: {type: :string}
                },
                required: %w[id type]
              }
            },
            required: %w[data]
          },
          response_relation: {
            type: :object,
            properties: {
              data: {
                type: :object,
                properties: {
                  id: {type: :string},
                  type: {type: :string}
                },
                required: %w[id type]
              }
            },
            required: %w[data]
          },
          response_relations: {
            type: :object,
            properties: {
              data: {
                type: :array,
                items: {
                  object: :object,
                  properties: {
                    id: {type: :string},
                    type: {type: :string}
                  },
                  required: %w[id type]
                }
              }
            },
            required: %w[data]
          },
          enum: {
            type: :object,
            properties: {
              id: {type: :string},
              type: {type: :string},
              attributes: {
                type: :object,
                properties: {
                  name: {type: :string}
                },
                required: %w[name]
              }
            },
            required: %w[id type attributes]
          },
          errors: {
            type: :object,
            properties: {
              errors: {
                type: :array,
                items: {
                  type: :object,
                  properties: {
                    title: {type: :string}
                  },
                  required: %w[title]
                }
              }
            },
            required: %w[errors]
          }
        }
      },
      servers: [
        {
          url: "/sub-path/backend"
        },
        {
          url: "{scheme}://{host}",
          variables: {
            scheme: {
              default: "http"
            },
            host: {
              default: "localhost:4000"
            }
          }
        }
      ]
    }
  }

  config.swagger_format = :yaml
end
