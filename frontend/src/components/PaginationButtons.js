import React from 'react';

function PaginationButtons({ pag_num, totalPages, handlePageChange }) {
  const getPageNumbers = () => {
    const pageNumbers = [];

    // Mostrar solo la página anterior, actual y siguiente
    if (pag_num > 1) {
      pageNumbers.push(pag_num - 1);
    }
    pageNumbers.push(pag_num);
    if (pag_num < totalPages) {
      pageNumbers.push(pag_num + 1);
    }

    return pageNumbers;
  };

  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li className={`page-item ${pag_num === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(pag_num - 1)} disabled={pag_num === 1}>Previous</button>
        </li>
        {getPageNumbers().map(page => (
          <li key={page} className={`page-item ${pag_num === page ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(page)}>{page}</button>
          </li>
        ))}
        <li className={`page-item ${pag_num === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(pag_num + 1)} disabled={pag_num === totalPages}>Next</button>
        </li>
      </ul>
    </nav>
  );
}

export { PaginationButtons };
