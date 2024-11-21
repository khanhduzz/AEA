package com.zoro.inventory.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "t_inventories")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Inventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String skuCode;
    private Integer quantity;
}
