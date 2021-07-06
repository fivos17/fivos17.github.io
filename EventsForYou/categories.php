<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php require("connect_db.php"); $cat = $_GET["cat"]; echo $cat ?> for you</title>
    <!-- bootstrap -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <!-- fonts -->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <!-- favicons -->
    <link rel="apple-touch-icon" sizes="180x180" href="./assets/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="./assets/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="./assets/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <!-- css -->
    <link href="./exercise.css" rel="stylesheet" type="text/css">

</head>

<body>
    <div class="container-fluid">
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
            <a class="navbar-brand" href="http://project1.syros.aegean.gr/~dpsd17116/EventsForYou/index.php">EventsforYou</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item"><a class="nav-link" href="http://project1.syros.aegean.gr/~dpsd17116/EventsForYou/categories.php?cat=Τέχνη&id=1">Τέχνη</a></li>
                <li class="nav-item"><a class="nav-link" href="http://project1.syros.aegean.gr/~dpsd17116/EventsForYou/categories.php?cat=Διασκέδαση&id=2">Διασκέδαση</a></li>
                <li class="nav-item"><a class="nav-link" href="http://project1.syros.aegean.gr/~dpsd17116/EventsForYou/categories.php?cat=Αθλητισμός&id=3">Αθλητισμός</a></li>
                <li class="nav-item"><a class="nav-link" href="http://project1.syros.aegean.gr/~dpsd17116/EventsForYou/categories.php?cat=Φαγητό&id=4">Φαγητό&Ποτό</a></li>
                <li class="nav-item"><a class="nav-link" href="http://project1.syros.aegean.gr/~dpsd17116/EventsForYou/categories.php?cat=Σεμινάρια&id=5">Σεμινάρια</a></li>                    
                <li class="nav-item"><a class="nav-link" href="http://project1.syros.aegean.gr/~dpsd17116/EventsForYou/categories.php?cat=Φεστιβάλ&id=6">Φεστιβάλ</a></li>
                </ul>
                <form action="./search.php" method="POST" class="form-inline my-2 my-lg-0 my-xl-0">
                    <input class="form-control mr-2" name="srch" type="text" placeholder="Αναζήτηση...">
                    <button class="btn btn-light" type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </button>
                </form>

            </div>
        </nav>

        <div id="content" class="container">
        <h3><?php echo $cat ?></h3>
            <div class="row">
                <?php
                require("create_event_box.php");
                $id = $_GET["id"];
                $sql = "SELECT * FROM skg_events WHERE type_id=$id ORDER BY event_date";
                $result = mysqli_query($conn, $sql);
                $num_results = mysqli_num_rows($result);
                if ($num_results > 0) {
                    while ($row = mysqli_fetch_array($result)) {

                        createEventBox($row['event_id'], $row['title'], $row['location'], $row['event_date'], $row['thumpnail'], $row['likes']);
                    }
                } else {
                    echo "<h3 class=\"error\">Δεν βρέθηκαν αποτελέσματα.<h3>";
                }
                ?>
            </div>
        </div>

        <div id="footer" class="row">
            <p>
                Επικοινωνία <br> Dpsd17067 Nikiforos Mavridis<br> Dpsd17116 Foivos Foukas<br> 2021 Τμήμα Μηχανικών
                Σχεδίασης<br> Προιόντων και Συστημάτων
            </p>
        </div>
    </div>

</body>

</html>