package com.example.datatables.io.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Car implements Serializable {

	private static final long serialVersionUID = -3553900032962588270L;

	@Id
	private Long id;

	private String carName;
}
