import React from 'react';

function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/products">LastProductList</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link" href="/ProductEvolution">ProductEvolution</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link" href="Contact">Contact</a>
                    </li>
                </ul>
                <form class="d-flex" role="search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </div>
    </nav>
  );
}

export {Navbar}