import type { Schema, Struct } from '@strapi/strapi';

export interface CzechCzech extends Struct.ComponentSchema {
  collectionName: 'components_czech_czeches';
  info: {
    description: '';
    displayName: 'czech';
  };
  attributes: {
    noun: Schema.Attribute.String & Schema.Attribute.Unique;
    verb: Schema.Attribute.String & Schema.Attribute.Unique;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'czech.czech': CzechCzech;
    }
  }
}
