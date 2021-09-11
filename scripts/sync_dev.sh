if [ -f .env ]; then
    # Load Environment Variables
    export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
    # For instance, will be example_kaggle_key
    echo $KAGGLE_KEY
fi

APP=$APP_NAME
echo "Synchronizing uploads folder..."
curl https://terrakrya.s3.us-west-002.backblazeb2.com/$APP/uploads/$APP-uploads.zip --output $APP-uploads.zip
unzip -o $APP-uploads.zip -d api/uploads/
rm $APP-uploads.zip
echo "Synchronizing database..."
curl https://terrakrya.s3.us-west-002.backblazeb2.com/$APP/dumps/$APP-latest.zip --output $APP-latest.zip
mongorestore --archive=$APP-latest.zip --gzip --db $APP --drop
rm $APP-latest.zip
echo "Sync finished with success \o/"
