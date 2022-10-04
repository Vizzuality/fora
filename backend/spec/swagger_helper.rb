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
            required: %w[id type attributes]
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
