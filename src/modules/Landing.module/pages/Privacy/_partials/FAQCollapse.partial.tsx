import React from 'react';
import Collapse from '../../../../../components/utils/Collapse';
import {
  CardBody,
  CardFooter,
  CardHeader,
  CardHeaderChild,
  CardSubTitle,
  CardTitle,
} from '../../../../../components/ui/Card';
import { Card } from 'antd';
import Button from '../../../../../components/ui/Button';

interface TFAQCollapsePartialProps {
  title: string;
  body: string;
  expandText?: string;
}

export const FAQCollapsePartial: React.FC<TFAQCollapsePartialProps> = ({ title, body }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  return (
    <Card
      onClick={() => setIsOpen((pre) => !pre)}
      className='cursor-pointer border-blue-500 bg-inherit !py-0  dark:border-blue-200'>
      <CardHeader className='!p-0'>
        <CardHeaderChild>
          <CardSubTitle className='font-medium'>{title}</CardSubTitle>
        </CardHeaderChild>
        <CardHeaderChild>
          <Button icon={isOpen ? 'HeroChevronUp' : 'HeroChevronDown'}></Button>
        </CardHeaderChild>
      </CardHeader>
      <CardBody className='!px-0'>
        <Collapse isOpen={isOpen}>
          <CardSubTitle className='pt-4 text-justify'>{body}</CardSubTitle>
        </Collapse>
      </CardBody>
    </Card>
  );
};
