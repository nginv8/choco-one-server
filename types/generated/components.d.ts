import type { Schema, Attribute } from '@strapi/strapi';

export interface OptionsSetOption extends Schema.Component {
  collectionName: 'components_parameters_options';
  info: {
    displayName: 'option';
    icon: 'check';
    description: '';
  };
  attributes: {
    price: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Attribute.DefaultTo<0>;
    name: Attribute.String & Attribute.Required;
    available: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<true>;
  };
}

export interface OrderOrderProduct extends Schema.Component {
  collectionName: 'components_order_product';
  info: {
    displayName: 'order product';
    icon: 'cart';
    description: '';
  };
  attributes: {
    productId: Attribute.Integer & Attribute.Required;
    product: Attribute.Relation<
      'order.order-product',
      'oneToOne',
      'api::product.product'
    >;
    quantity: Attribute.Integer & Attribute.Required;
    selectedOptions: Attribute.Component<'order.order-selected-option', true>;
    price: Attribute.Decimal;
    selectedOptionsString: Attribute.Text;
    productName: Attribute.String;
  };
}

export interface OrderOrderSelectedOption extends Schema.Component {
  collectionName: 'components_order_selected_option';
  info: {
    displayName: 'order selected option';
    icon: 'options';
    description: '';
  };
  attributes: {
    optionSetId: Attribute.Integer & Attribute.Required;
    optionSetName: Attribute.String & Attribute.Required;
    optionId: Attribute.Integer & Attribute.Required;
    optionName: Attribute.String;
    optionPrice: Attribute.Decimal & Attribute.Required;
  };
}

export interface ShopDelivery extends Schema.Component {
  collectionName: 'components_shop_deliveries';
  info: {
    displayName: 'delivery';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    price: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Attribute.DefaultTo<0>;
  };
}

export interface ShopEmail extends Schema.Component {
  collectionName: 'components_shop_emails';
  info: {
    displayName: 'email';
    description: '';
  };
  attributes: {
    email: Attribute.Email & Attribute.Required;
  };
}

export interface ShopPayment extends Schema.Component {
  collectionName: 'components_shop_payments';
  info: {
    displayName: 'payment';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    description: Attribute.Text;
  };
}

export interface ShopPhone extends Schema.Component {
  collectionName: 'components_shop_phones';
  info: {
    displayName: 'phone';
    description: '';
  };
  attributes: {
    phone: Attribute.String & Attribute.Required;
  };
}

export interface ShopSocialMedia extends Schema.Component {
  collectionName: 'components_shop_social_medias';
  info: {
    displayName: 'social media';
    description: '';
  };
  attributes: {
    link: Attribute.Text & Attribute.Required;
    name: Attribute.Enumeration<['facebook', 'instagram', 'twitter']> &
      Attribute.Required;
  };
}

export interface ShopTaxes extends Schema.Component {
  collectionName: 'components_shop_taxes';
  info: {
    displayName: 'tax';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    value: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Attribute.DefaultTo<0>;
    type: Attribute.Enumeration<['fixed', 'percent']> & Attribute.Required;
  };
}

export interface UserAddress extends Schema.Component {
  collectionName: 'components_user_addresses';
  info: {
    displayName: 'address';
    icon: 'earth';
    description: '';
  };
  attributes: {
    address: Attribute.String & Attribute.Required;
    selected: Attribute.Boolean & Attribute.DefaultTo<false>;
    name: Attribute.String;
    zip: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'options-set.option': OptionsSetOption;
      'order.order-product': OrderOrderProduct;
      'order.order-selected-option': OrderOrderSelectedOption;
      'shop.delivery': ShopDelivery;
      'shop.email': ShopEmail;
      'shop.payment': ShopPayment;
      'shop.phone': ShopPhone;
      'shop.social-media': ShopSocialMedia;
      'shop.taxes': ShopTaxes;
      'user.address': UserAddress;
    }
  }
}
