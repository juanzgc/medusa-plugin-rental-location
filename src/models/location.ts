import {
  Entity,
  BeforeInsert,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  Column,
  PrimaryColumn,
  JoinColumn,
  Unique,
  Index,
} from "typeorm"
import { ulid } from "ulid"
import { ProductVariant } from "@medusajs/medusa"

@Entity()
export class Location {
  @PrimaryColumn()
  id: string

  @Column()
  city: string

  @ManyToOne(() => ProductVariant)
  @JoinColumn({ name: "variant_id" })
  variant: ProductVariant

  @Column()
  @Index({ unique: true, where: "deleted_at IS NULL" })
  city_slug: string

  @Column()
  country: string

  @Column({ type: "jsonb", nullable: true })
  metadata: any

  @BeforeInsert()
  private beforeInsert() {
    if (this.id) return
    const id = ulid()
    this.id = `loc_${id}`
  }
}
