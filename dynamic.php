<?php
/**
 * @author DarkMukke <mukke@tbs-dev.co.uk>
 * @author TBS Development <support@tbs-dev.co.uk>
 */


/**
 * Helper method to get all files of a folder recursively
 *
 * @param string $dir
 * @param array $results
 * @param boolean $withDirs Include directories in the list or not. Default: false
 */
function getDirContents($dir, &$results, $withDirs = false)
{
    $files = scandir($dir);

    foreach ($files as $key => $value) {
        $path = realpath($dir . DIRECTORY_SEPARATOR . $value);
        if (!is_dir($path)) {
            $results[] = $path;
        } else {
            if ($value !== '.' && $value !== '..') {
                getDirContents($path, $results);
                if (false !== $withDirs) {
                    $results[] = $path;
                }
            }
        }
    }
}


$assetsDir = $_SERVER['DOCUMENT_ROOT'] . '/assets';
$autoladerFiles = [];
getDirContents($assetsDir, $autoladerFiles);
$autoladerFiles = array_map(function ($path) {
    //get relative path and convert windows paths if needed
    return str_replace($_SERVER['DOCUMENT_ROOT'] , '', str_replace('\\', '/', $path));
}, $autoladerFiles);

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Deffer Js And Css - based on route and NS</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- jQuery : needed before domReady -->
    <script src="assets/js/jquery.js"></script>

    <!-- Deferred auto loading for js and css -->
    <script type="text/javascript" src="/assets/App/Helper/Autoloader.js"></script>
    <script>
        var autoloader = new App.Helper.Autoloader('/assets', '/subdir/index', '<?php echo json_encode($autoladerFiles);?>');
        autoloader.require('/App/layout');
    </script>
</head>
<body>


This page does not throw 404 errors when trying to load files that don't exist.

</body>
</html>
