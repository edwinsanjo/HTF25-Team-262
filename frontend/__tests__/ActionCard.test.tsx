import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ActionCard from '../app/components/ActionCard';
import { ReportFoundIcon } from '../app/components/ActionIcons';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('ActionCard', () => {
  it('renders with title and description', () => {
    render(
      <ActionCard
        icon={<ReportFoundIcon />}
        title="Report Found"
        description="Upload images & details"
        href="/report-found"
      />
    );

    expect(screen.getByText('Report Found')).toBeInTheDocument();
    expect(screen.getByText('Upload images & details')).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(
      <ActionCard
        icon={<ReportFoundIcon />}
        title="Report Found"
        description="Upload images & details"
        href="/report-found"
      />
    );

    const link = screen.getByRole('button');
    expect(link).toHaveAttribute('href', '/report-found');
  });
});