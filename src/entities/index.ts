/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: members
 * Interface for Members
 */
export interface Members {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType multi_reference */
  orders?: Orders[];
  /** @wixFieldType text */
  firstName?: string;
  /** @wixFieldType text */
  lastName?: string;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType image */
  profilePicture?: string;
  /** @wixFieldType datetime */
  registrationDate?: Date | string;
  /** @wixFieldType boolean */
  isAdmin?: boolean;
}


/**
 * Collection ID: orders
 * Interface for Orders
 */
export interface Orders {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType multi_reference */
  ordereditems?: Sweets[];
  /** @wixFieldType text */
  orderNumber?: string;
  /** @wixFieldType datetime */
  orderDate?: Date | string;
  /** @wixFieldType number */
  totalAmount?: number;
  /** @wixFieldType text */
  orderStatus?: string;
  /** @wixFieldType text */
  shippingAddress?: string;
  /** @wixFieldType text */
  paymentStatus?: string;
  /** @wixFieldType multi_reference */
  members?: Members[];
}


/**
 * Collection ID: sweetcategories
 * Interface for SweetCategories
 */
export interface SweetCategories {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  categoryName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image */
  categoryImage?: string;
  /** @wixFieldType boolean */
  isActive?: boolean;
  /** @wixFieldType number */
  sortOrder?: number;
}


/**
 * Collection ID: sweets
 * Interface for Sweets
 */
export interface Sweets {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType number */
  price?: number;
  /** @wixFieldType image */
  mainImage?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType number */
  stockLevel?: number;
  /** @wixFieldType multi_reference */
  orders?: Orders[];
}
