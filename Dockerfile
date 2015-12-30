#
# Nginx Dockerfile
#
# https://github.com/dockerfile/nginx
#

# Pull base image.
FROM ansible/ubuntu14.04-ansible

# Install Nginx.
RUN \
  apt-get update && \
  apt-get install -y nginx && \
  rm -rf /var/lib/apt/lists/* && \
  echo "\ndaemon off;" >> /etc/nginx/nginx.conf && \
  chown -R www-data:www-data /var/lib/nginx

# Define mountable directories.


# Define working directory.
WORKDIR /etc/nginx

RUN mkdir -p /home/curtain_ui/www

RUN rm /etc/nginx/sites-enabled/default

ADD curtain_ui.conf /etc/nginx/sites-available/

RUN ln -s /etc/nginx/sites-available/curtain_ui.conf /etc/nginx/sites-enabled/curtain_ui.conf

COPY www /home/curtain_ui/www/

RUN chmod 755 -R /home/curtain_ui/

WORKDIR /home/curtain_ui/



# Define default command.
CMD ["nginx"]

# Expose ports.
EXPOSE 80
EXPOSE 443

# build using:
# docker build -t curtain_ui .
# run using:
# docker run -p 8080:80 -t curtain_ui
# in production
# docker run -p 80:80 -t curtain_ui


