import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// TODO: This entity is a placeholder for storing salts for password hashing.
// this should be handled by some other form of persistence.
@Entity()
export default class SaltEntity {
    // This entity can be used to store salts for password hashing
    // If you need to store salts, you can define columns here
    // For example, you might want to store a user ID and the salt value
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    // this is an explicit manual connection. 
    @Column()
    userId: string;
    
    @Column()
    salt: string;
}