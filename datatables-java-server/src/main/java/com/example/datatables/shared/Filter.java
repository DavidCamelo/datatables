package com.example.datatables.shared;

import org.springframework.data.domain.Sort.Direction;

import lombok.Data;

@Data
public class Filter {

	private int page = 1;

	private int limit = 1;

	private Direction direction = Direction.ASC;

	private String orderBy = "id";

	private String searchText;
}
